import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';
import config from '../../../config';

@Injectable()
export class OpentokService {

  session: OT.Session;
  token: string;

  constructor() { }

  getOT() {
    return OT;
  }
  // initSessionData(conf_data) {
  //   if (conf_data.API_KEY && conf_data.TOKEN && conf_data.SESSION_ID) {
  //     this.session = this.getOT().initSession(conf_data.API_KEY, conf_data.SESSION_ID);
  //     this.token = conf_data.TOKEN;
  //     return Promise.resolve(this.session);
  //   } else {
  //     return fetch(conf_data.SAMPLE_SERVER_BASE_URL + '/session')
  //       .then((data) => data.json())
  //       .then((json) => {
  //         this.session = this.getOT().initSession(json.apiKey, json.sessionId);
  //         this.token = json.token;
  //         return this.session;
  //       });
  //   }
  // }
  initSession() {
    if (config.API_KEY && config.TOKEN && config.SESSION_ID) {
      this.session = this.getOT().initSession(config.API_KEY, config.SESSION_ID);
      this.token = config.TOKEN;
      return Promise.resolve(this.session);
    } else {
      return fetch(config.SAMPLE_SERVER_BASE_URL + '/session')
        .then((data) => data.json())
        .then((json) => {
          this.session = this.getOT().initSession(json.apiKey, json.sessionId);
          this.token = json.token;
          return this.session;
        });
    }
  }
  initSessionData(conf_data) {
    if (conf_data.API_KEY && conf_data.TOKEN && conf_data.SESSION_ID) {
      this.session = this.getOT().initSession(conf_data.API_KEY, conf_data.SESSION_ID);
      this.token = conf_data.TOKEN;
      return Promise.resolve(this.session);
    } else {
      return fetch(conf_data.SAMPLE_SERVER_BASE_URL + '/session')
        .then((data) => data.json())
        .then((json) => {
          this.session = this.getOT().initSession(json.apiKey, json.sessionId);
          this.token = json.token;
          return this.session;
        });
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.session);
        }
      });
    });
  }
}
