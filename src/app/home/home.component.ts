import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogConfig, DialogService, ToastService} from 'ngx-weui';
import {RedpacketProfile} from 'src/app/service/data';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  profile: Partial<RedpacketProfile> = {}
  constructor(
    private router: Router,
    private toastSrv: ToastService,
    private dialogSrv: DialogService,
    private route: ActivatedRoute,
    private titleService: Title) {

    route.data.subscribe(res => {
      titleService.setTitle(res.title);
    })
  }


  private DEFCONFIG: DialogConfig = {
    title: '弹窗标题',
    content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
    cancel: '辅助操作',
    confirm: '主操作',
    inputPlaceholder: '必填项',
    inputError: '请填写或选择项',
    inputRequired: true,
    inputAttributes: {
      maxlength: 140,
      cn: 2,
    },
    inputOptions: [
      {text: '请选择'},
      {text: '杜蕾斯', value: 'durex', other: 1},
      {text: '杰士邦', value: 'jissbon'},
      {text: '多乐士', value: 'donless'},
      {text: '处男', value: 'first'},
    ],
  } as DialogConfig;
  config: DialogConfig = this.DEFCONFIG;



  async ngOnInit(): Promise<void> {
    this.toast();
  }


  toast() {
    this.toastSrv.show('点击');
  }
  loading() {
    this.toastSrv.loading('loading...');
  }

  dialog() {
    const dialog = this.dialogSrv.show({
      title: '提示',
      content: '您已欠费',
      skin: 'ios',
      backdrop: true,
      cancel: null,
    }).subscribe(res => {

    });
  }


}
