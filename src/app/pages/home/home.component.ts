import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  title = "appBootstrap";
  post = new PostModel();
  applicantCode = localStorage.getItem("applicantcode");
  closeResult: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal, private postService: PostService
  ) {}

  ngOnInit() {}

  salir() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

  createPost(data) {
    this.postService.createPost(data, this.applicantCode).subscribe(resp => {
      console.log(resp);
    })
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
