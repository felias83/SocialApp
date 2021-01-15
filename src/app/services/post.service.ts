import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { PostModel } from "../models/post.model";
import { environment } from "../../environments/environment.prod";
import { UsuarioModel } from "../models/usuario.model";
import { map } from "rxjs/operators";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  post = new PostModel();
  usuario = new UsuarioModel();
  private url = "http://apibitwanv1.tk/public";

  constructor(private http: HttpClient) {}
  createPost(data, applicantcode) {
    const body = new HttpParams()

      .set("applicantcode", applicantcode)
      .set("token", localStorage.getItem("token"))
      .set("iduser", localStorage.getItem("iduser"))
      .set("description", data.value.description)
      .set("image", data.value.image);
    console.log("body", body);
    return this.http
      .post(`${this.url}/posts/create`, body.toString(), this.getOptions())
      .pipe(
        map((resp) => {
          console.log(resp);
          return resp;
        })
      );
  }
  deletePost(idPost, applicantcode) {
    const body = new HttpParams()

      .set("applicantcode", applicantcode)
      .set("token", localStorage.getItem("token"))
      .set("idpost", idPost)
     
    console.log("body", body);
    return this.http
      .post(`${this.url}/posts/delete`, body.toString(), this.getOptions())
      .pipe(
        map((resp) => {
          console.log(resp);
          return resp;
        })
      );
  }
  viewPostByIdUser(f: NgForm, applicantcode): Observable<any> {
    const body = new HttpParams()

      .set("applicantcode", applicantcode)
      .set("token", localStorage.getItem("token"))
      .set("iduser", localStorage.getItem("iduser"));

    console.log("body", body);
    return this.http
      .post(
        `${this.url}/posts/viewbyiduser`,
        body.toString(),
        this.getOptions()
      )
      .pipe(
        map((resp) => {
          console.log(resp);
          return resp;
        })
      );
  }
  getOptions(): any {
    const headers: any = {
      "Content-type": "application/x-www-form-urlencoded",
    };
    // const token = localStorage.getItem("token");
    // if (token) {
    //   headers.Authorization = "Bearer " + token;
    // }
    const options = { headers: new HttpHeaders(headers) };
    return options;
  }
}
