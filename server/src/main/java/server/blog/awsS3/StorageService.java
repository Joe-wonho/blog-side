package server.blog.awsS3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import server.blog.user.entity.Users;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;


@Service
@Slf4j
public class StorageService {

    @Value("${application.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;


    // s3 버킷에 파일 업로드
    public String uploadFile(MultipartFile file) {
        File fileObj = convertMultiPartFileToFile(file); // MultipartFile -> File 객체로 변환
        String name = fileObj.getName();
        s3Client.putObject(new PutObjectRequest(bucketName, name, fileObj)); // s3 버킷에 업로드
        String url = ""+s3Client.getUrl("blog-side", name); // 업로드된 파일의 url 생성
        fileObj.delete();
        return url;
    }


    // s3 버킷에 파일 수정 업로드
    public String uploadFile(MultipartFile file, Users users) { // 해당 아이디로 파일 업로드
        // 기존 파일 삭제
        s3Client.deleteObject(bucketName, users.getProfile());

        // 현재 파일 업로드
        File fileObj = convertMultiPartFileToFile(file);
        String fileName =  Long.toString(users.getUserId());
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
        String url = ""+s3Client.getUrl("blog-side", fileName);
        fileObj.delete();
        return url;
    }


    public byte[] downloadFile(String fileName) { // 주어진 파일 이름으로 s3 버킷에서 파일 다운로드
        S3Object s3Object = s3Client.getObject(bucketName, fileName); // 파일 가져오기
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream); // 바이트 배열로 변환하여 반환
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }



    // MultipartFile -> File 객체 변환 메서드
    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }
}
