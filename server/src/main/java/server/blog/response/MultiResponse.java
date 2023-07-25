package server.blog.response;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponse<T> {
    private List<T> data;
    private PageInfo pageInfo;

    public MultiResponse(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = pageInfo;
    }
}
