import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { UsuarioModel } from "../models/usuario.model";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "http://apibitwanv1.tk/public";

  userToken: string;
  idUser: string;
  applicantCode: string;

  constructor(private http: HttpClient) {
    this.leerToken();
    this.leerIdUser();
    this.leerApplicantCode();
  }

  logout() {
    localStorage.removeItem("token");
  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    const body = new HttpParams()
      .set("email", usuario.email)
      .set("password", usuario.password)
      .set("applicantcode", usuario.applicantcode);

    return this.http.post(`${this.url}/login`, body, { headers: headers }).pipe(
      map((resp) => {
        this.guardarToken(resp["data"]["token"]);
        this.guardarIdUser(resp["data"]["iduser"]);
        this.guardarApplicantCode(usuario.applicantcode);
        return resp;
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    const body = new HttpParams()
      .set("email", usuario.email)
      .set("password", usuario.password)
      .set("applicantcode", usuario.applicantcode)
      .set("image", usuario.image)
      .set("birthdate", usuario.birthdate)
      .set("nickname", usuario.nickname);

    return this.http
      .post(`${this.url}/create/users/create`, body, { headers: headers })
      .pipe(
        map((resp) => {
          this.guardarToken(resp["token"]);
          return resp;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem("expira", hoy.getTime().toString());
  }
  private guardarIdUser(idUser: string) {
    this.idUser = idUser;
    localStorage.setItem("iduser", idUser);
  }
  private guardarApplicantCode(applicantCode: string) {
    this.applicantCode = applicantCode;
    localStorage.setItem("applicantcode", applicantCode);
  }

  leerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }

    return this.userToken;
  }
  leerApplicantCode() {
    if (localStorage.getItem("applicantcode")) {
      this.applicantCode = localStorage.getItem("applicantcode");
    } else {
      this.applicantCode = "";
    }

    return this.applicantCode;
  }
  leerIdUser() {
    if (localStorage.getItem("iduser")) {
      this.idUser = localStorage.getItem("iduser");
    } else {
      this.idUser = "";
    }

    return this.idUser;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem("expira"));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
