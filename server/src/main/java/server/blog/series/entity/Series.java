package server.blog.series.entity;

import lombok.*;
import server.blog.audit.Auditable;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Series extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "series_id")
    private Long seriesId;

    @Column(name = "series_name", nullable = false)
    private String seriesName;

    @Builder
    public Series(Long seriesId, String seriesName) {
        this.seriesId = seriesId;
        this.seriesName = seriesName;
    }

}
