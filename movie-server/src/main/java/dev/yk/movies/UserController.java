package dev.yk.movies;

import dev.yk.movies.dtos.LoginDto;
import dev.yk.movies.dtos.SignupDto;
import jakarta.annotation.Nonnull;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/welcome")
    public ResponseEntity<?> welcome (){

        return new ResponseEntity<>("this end point is not protected", HttpStatus.OK);
    }
    @GetMapping("/younotwelcome")
    public ResponseEntity<?> younotwelcomwelcome (){
        return new ResponseEntity<>("this end point is protected", HttpStatus.OK);
    }
    @GetMapping("/getMyProfile")
    public ResponseEntity<?> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        return new ResponseEntity<>(currentUserName, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Nonnull @Valid @RequestBody SignupDto payload){
        return userService.signupAndEncryptPasswordAndInsertToDb(payload);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Nonnull @Valid @RequestBody LoginDto payload){
        return userService.ValidateBcryptLogUserAndCreateToken(payload);

    }
}
