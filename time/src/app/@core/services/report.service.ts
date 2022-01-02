import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ReportService {

    private attendanceAPI = 'time';
    constructor(
        private http: ApiService,
    ) { }

    sendTime(time: any) {
        return this.http.post(this.attendanceAPI, time);
    }
}

