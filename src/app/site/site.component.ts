import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import { SignupTypeComponent } from './components/registration/signup-type/signup-type.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../_services';
import { Globals } from '../globals';
import { CourseView } from '../_models/loadData';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  langStyle: any;
  headerShow: any = true;
  footerShow: any = true;
  courseDetail: CourseView;
  ipAddress: string;
  constructor(public router: Router,
    public globals: Globals,
    public route: ActivatedRoute,
    public app_ser: AppService,
    public authenticationService: AuthenticationService,
    private modalService: NgbModal) {
    this.langStyle = "lang-site-main-" + this.app_ser.app_lang();
    this.loadTemplates();
    this.app_ser.openPaymentGateway(this.courseDetail);

    this.app_ser.closePaymentGateway("1");
  }


  ngOnInit() {
    this.getIP();
    if (this.router.url.includes('/pay/') || this.router.url.includes('/payment') || this.router.url.includes('/payment/loading') || this.router.url.includes('/payment/success/') || this.router.url.includes('/payment/failure')) {
      this.headerShow = false;
      this.footerShow = false;

    }
    else {
      this.headerShow = true;
      this.footerShow = true;
    }
  }
  checkPayment(orderREF) {

    this.app_ser.post("site_feed/Bank_payment/check_payment", { order_ref: orderREF }).subscribe(
      data => {

        console.log(
          "Payment eeee ", AppService.arrModals);


        return this.app_ser.closeAllPaymentGateway("111");
        return AppService.paymentMethodModal.close(data);
        this.app_ser.closePaymentGateway(data);
        return
        this.globals.paymentModal.close(data)

        this.router.navigate(['/payment/success/data']);
      },
      error => {
        console.log(
          "Payment eeee ", AppService.arrModals);


        return this.app_ser.closeAllPaymentGateway("111");
        return AppService.paymentMethodModal.close("111");
        this.router.navigate(['/payment/failure']);

      });



  }

  getIP() {
    // alert(111);
    // this.app_ser.getIPAddress().subscribe((res: any) => {
    //   alert(222);
    //   this.ipAddress = res.ip;
    //   alert(res.ip);
    // });
  }

  loadTemplates() {
    var data1 = { data: { page: 0, size: 100000 } };
    this.app_ser.post("site_feed/course/load_categories", data1).subscribe(
      data => {
        this.globals.footerTemplates = data.main_categories;
        this.globals.subCategories1 = data.sub_categories;

      },
    )


  }

}
