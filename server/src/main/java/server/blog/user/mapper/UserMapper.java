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
        UserDto.LoginResponse userLoginResponse = new UserDto.LoginResponse(users.getUserId(), users.getNickname());
        return userLoginResponse;
    }

    default UserDto.UserResponse userToUserResponseDto(Users users){
        UserDto.UserResponse userResponse = new UserDto.UserResponse(users.getUserId(), users.getNickname(), users.getEmail(), users.getName(), users.getProfile());
        return userResponse;
    }

    default UserDto.UserCheckResponse userToUserCheckResponseDto(Users users){
        UserDto.UserCheckResponse userCheckResponse = new UserDto.UserCheckResponse(users.getUserId(), users.getNickname(), users.getName(), users.getProfile());
        return userCheckResponse;
    }

    List<Users> usersToUserResponseDtos(List<Users> users);
}