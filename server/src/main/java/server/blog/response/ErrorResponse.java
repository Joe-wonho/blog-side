package server.blog.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import server.blog.exception.ExceptionCode;

import javax.validation.ConstraintViolation;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class ErrorResponse {
    private int status;
    private String message;
    private List<ErrorField> errors;

    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    private ErrorResponse(final List<ErrorField> errors) {
        this.errors = errors;
    }
    private ErrorResponse(int status, String message, List<ErrorField> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    public static ErrorResponse of(BindingResult bindingResult) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "유효성 검사 실패", ErrorField.of(bindingResult));
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> violations) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "유효성 검사 실패", ConstraintViolationError.of(violations));
    }

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return new ErrorResponse(httpStatus.value(), message);
    }

    public void addError(ErrorField error) {
        if (this.errors == null) {
            this.errors = new ArrayList<>();
        }
        this.errors.add(error);
    }

    @Getter
    public static class ErrorField {
        private String field;
        private String message;

        private ErrorField(String field, String message) {
            this.field = field;
            this.message = message;
        }

        public static List<ErrorField> of(BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors =
                    bindingResult.getFieldErrors();
            return fieldErrors.stream()
                    .map(error -> new ErrorField(
                            error.getField(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    public static class ConstraintViolationError {
        private String propertyPath;
        private String message;

        private ConstraintViolationError(String propertyPath, String message) {
            this.propertyPath = propertyPath;
            this.message = message;
        }

        public static List<ErrorField> of(
                Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(constraintViolation -> new ErrorField(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }
    }
}