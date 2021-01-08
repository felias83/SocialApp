import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { PostModel } from "../../models/post.model";
import { PostService } from "../../services/post.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  title = "appBootstrap";
  post = new PostModel();
  applicantCode = localStorage.getItem("applicantcode");
  idUser = localStorage.getItem("iduser");
  postUser = [];
  images = FileList;
  closeResult: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.viewPostByUserId(this.idUser);
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }
  viewPostByUserId(idUser) {
    this.postService
      .viewPostByIdUser(idUser, this.applicantCode)
      .subscribe((resp) => {
        console.log(resp);
        console.log(resp["data"][0].description);
        this.postUser = resp["data"];
      });
  }

  selectFiles(event) {
    this.images = event.target.files;
    console.log(this.images);
  }

  createPost(f: NgForm) {
    this.postService.createPost(f, this.applicantCode).subscribe((resp) => {
      console.log(resp);
    });
  }
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
