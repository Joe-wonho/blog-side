package server.blog.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "회원이 존재하지 않습니다."),
    USER_EXIST(402, "존재하는 회원입니다."),
    UNAUTHORIZED_MEMBER(401, "접근 권한이 없습니다."),
    UNAUTHORIZED_ACCESSTOKEN(401, "액세스토큰이 만료되었습니다."),
    EMAIL_EXIST(404,"이메일이 이미 존재합니다."),
    NICKNAME_EXISTS(409, "같은 이름의 닉네임이 존재합니다."),
    MAILKEY_MISMATCH(409, "메일키가 다릅니다."),
    PASSWORD_NOT_CORRECT(409, "잘못된 비밀번호입니다."),
    POST_NOT_FOUND(404, "게시글이 존재하지 않습니다."),
    POST_NOT_WRITE(402, "권한이 없습니다."),
    INVALID_REFRESH_TOKEN(50401, "리프래시 토큰이 유효하지 않습니다."),
    INVALID_TOKEN(40003, "유효하지 않은 토큰입니다."),
    POST_AUTHOR_NOT_MATCH(401, "포스트 권한이 없습니다.");


    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
