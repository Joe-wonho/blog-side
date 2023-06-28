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
import server.blog.post.entity.Post;
import server.blog.user.entity.Users;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
public class StorageService {

    @Value("${application.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;


    // s3 버킷에 파일 업로드(한장)
    public String uploadFile(MultipartFile file) {
        File fileObj = convertMultiPartFileToFile(file); // MultipartFile -> File 객체로 변환
        String name = fileObj.getName();
        s3Client.putObject(new PutObjectRequest(bucketName, name, fileObj)); // s3 버킷에 업로드
        String url = ""+s3Client.getUrl("blog-side", name); // 업로드된 파일의 url 생성
        fileObj.delete();
        return url;
    }


    // s3 버킷에 파일 업로드(여러장)
    public List<String> uploadFiles(List<MultipartFile> files) {
        List<String> urls = new ArrayList<>();

        for (MultipartFile file : files) {
            File fileObj = convertMultiPartFileToFile(file); // MultipartFile -> File 객체로 변환
            String name = fileObj.getName();
            s3Client.putObject(new PutObjectRequest(bucketName, name, fileObj)); // s3 버킷에 업로드
            String url = "" + s3Client.getUrl("blog-side", name); // 업로드된 파일의 URL 생성
            fileObj.delete();
            urls.add(url);
        }

        return urls;
    }


    // s3 버킷에 파일 수정 업로드(한장)
    public String uploadFile(MultipartFile file, Users users) { // 해당 아이디로 파일 업로드
        // 기존 파일 삭제
        s3Client.deleteObject(bucketName, users.getProfile());

        // 현재 파일 업로드
        File fileObj = convertMultiPartFileToFile(file);
        String name = fileObj.getName();
        s3Client.putObject(new PutObjectRequest(bucketName, name, fileObj));
        String url = ""+s3Client.getUrl("blog-side", name);
        fileObj.delete();
        return url;
    }


    // s3 버킷에 파일 수정 업로드(여러장)
    public List<String> uploadFiles(Post post, List<MultipartFile> files) {
        // 기존 이미지 삭제
        List<String> existingImages = post.getImg();
        if (existingImages != null) {
            for (String existingImage : existingImages) {
                // 기존 이미지 삭제 로직 작성 (예: S3에서 이미지 삭제)
                s3Client.deleteObject(bucketName, existingImage);
            }
        }

        // 새로운 이미지 업로드
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            String imageUrl = uploadImg(file, post.getUsers());
            imageUrls.add(imageUrl);
        }

        return imageUrls;
    }
    // 여러장 수정시 필요 로직
    public String uploadImg(MultipartFile file, Users users) {
        // 현재 파일 업로드
        File fileObj = convertMultiPartFileToFile(file);
        String name = fileObj.getName();
        s3Client.putObject(new PutObjectRequest(bucketName, name, fileObj));
        String url = "" + s3Client.getUrl("blog-side", name);
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

//    private List<File> convertMultiPartFilesToFiles(List<MultipartFile> files) {
//        List<File> convertedFiles = new ArrayList<>();
//        for (MultipartFile file : files) {
//            File convertedFile = new File(file.getOriginalFilename());
//            try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
//                fos.write(file.getBytes());
//                convertedFiles.add(convertedFile);
//            } catch (IOException e) {
//                log.error("Error converting multipartFile to file", e);
//            }
//        }
//        return convertedFiles;
//    }
}
