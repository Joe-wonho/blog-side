package server.blog.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import server.blog.user.dto.UserDto;
import server.blog.user.entity.User;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    User userPostDtoToUser(UserDto.Post requestBody);

    User userPatchDtoToUser(UserDto.Patch requestBody);

    UserDto.LoginResponse userToLoginResponseDto(User user);

    UserDto.UserResponse userToUserResponseDto(User user);

    List<User> usersToUserResponseDtos(List<User> users);
}
