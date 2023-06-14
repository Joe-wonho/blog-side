package server.blog.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
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


    List<Users> usersToUserResponseDtos(List<Users> users);
}
