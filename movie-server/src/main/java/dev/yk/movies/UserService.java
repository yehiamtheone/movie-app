package dev.yk.movies;

import dev.yk.movies.dtos.LoginDto;
import dev.yk.movies.dtos.SignupDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private MongoOperations mongoOperations;
    @Autowired
    private JwtService jwtService;

    public ResponseEntity<?>signupAndEncryptPasswordAndInsertToDb(SignupDto payload) {

        User user = new User();
        user.setUsername(payload.username());
        user.setEmail(payload.email());

        String encryptedPassword = passwordEncoder.encode(payload.password());
        user.setPassword(encryptedPassword);

        try {
            user = userRepository.save(user);
        } catch (DuplicateKeyException e1) {
            return new ResponseEntity<>(e1.getMessage() ,HttpStatus.CONFLICT);
        }  catch (Exception e2) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);



    }

    public ResponseEntity<?> ValidateBcryptLogUserAndCreateToken(LoginDto payload) {
        User currentUser = mongoOperations.findOne(
                Query.query(Criteria.where("username").is(payload.username()))
                        ,User.class,
                        "users"
                );
        if (currentUser == null){
            return new ResponseEntity<>("User not found No user with username: " + payload.username(), HttpStatus.NOT_FOUND);
        }


        boolean valid = passwordEncoder.matches(payload.password(), currentUser.getPassword());
        System.out.println(valid);
        if (!valid){
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
        String token = jwtService.generateJwtToken(currentUser);

        return new ResponseEntity<>(token, HttpStatus.OK);

    }
}
