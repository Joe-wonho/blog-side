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

    UserDto.LoginResponse userToLoginResponseDto(Users users);

    UserDto.UserResponse userToUserResponseDto(Users users);

    List<Users> usersToUserResponseDtos(List<Users> users);
}
