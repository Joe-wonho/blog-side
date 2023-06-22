package server.blog.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import server.blog.auth.dto.AuthLoginDto;
import server.blog.user.dto.UserDto;
import server.blog.user.entity.Users;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    Users userPostDtoToUser(UserDto.Post requestBody);

    Users userPatchDtoToUser(UserDto.Patch requestBody);

    default UserDto.LoginResponse userToLoginResponseDto(Users users){
        UserDto.LoginResponse userLoginResponse = new UserDto.LoginResponse();
        userLoginResponse.setUserId(users.getUserId());
        userLoginResponse.setNickname(users.getNickname());
        return userLoginResponse;
    }

    default UserDto.UserResponse userToUserResponseDto(Users users){
        UserDto.UserResponse userResponse = new UserDto.UserResponse();
        userResponse.setUserId(users.getUserId());
        userResponse.setEmail(users.getEmail());
        userResponse.setNickname(users.getNickname());
        userResponse.setName(users.getName());
        userResponse.setProfile(users.getProfile());

        return userResponse;
    }

    default Users AuthLoginDtoUser(AuthLoginDto request){
        Users users = new Users();
        users.setEmail(request.getEmail());
        users.setName(request.getName());
        users.setNickname(request.getNickname());
        users.setProfile(request.getProfile());

        return users;
    }


    List<Users> usersToUserResponseDtos(List<Users> users);
}
