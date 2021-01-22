import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {ToastService} from 'ngx-weui';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';


const CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  405: '跨域请求错误。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  get loading(): ToastService {
    return this.injector.get(ToastService);
  }


  private goTo(url: string) {
    setTimeout(() =>
      this.injector.get(Router).navigateByUrl(url, {replaceUrl: true}).then(() => window.location.reload()),
    );
  }

  private checkStatus(ev: HttpResponseBase) {
    if (ev.status >= 200 && ev.status < 300) return;
    const errortext = CODEMESSAGE[ev.status] || ev.statusText;

    if (ev.status !== 401)
      this.loading.show('授权错误');
  }

  private handleData(ev: HttpResponseBase): Observable<any> {

    console.log('响应：', ev);
    setTimeout(() => this.loading.destroyAll(), 300)
    this.checkStatus(ev);
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        if (ev instanceof HttpResponse) {
          const body: any = ev.body;
          if (!body) {
            return throwError({});
          } else {
            return of(ev);
          }
        }
        break;
      case 401: // 未登录状态码、
        // case 405:
        localStorage.clear();
        break;
      case 403:
      case 404:
      case 500:
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn(
            '未可知错误，大部分是由于后端不支持CORS或无效配置引起',
            ev,
          );
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loading.loading('加载中...');
    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('assets')) {
      if (!url.startsWith('https://') && !url.startsWith('http://')) {
        if (environment.production) {
          url = environment.SERVER_URL + url;
        } else {
          url = '/proxy' + url;
        }
      }
    }
    /// 获取token
    const token = localStorage.getItem('__local_redpacket_token');
    const newReq = req.clone({
      /// 设置url
      url,
      /// 设置token
      headers: req.headers.set('token', token),
    });

    console.log('请求：', newReq);


    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponseBase) return this.handleData(event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }
}
