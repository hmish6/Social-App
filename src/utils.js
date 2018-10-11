import moment from "moment";
import axios from "axios";

class Utils {
  prepareData(e, postFunction, args = {}) {
    e.preventDefault();
    let el = e.target,
      formData = {};
    for (let input of el.elements) {
      if (input.type !== "submit") {
        formData[input.getAttribute("name")] = input.value;
      }
    }
    formData = Object.assign(args, formData);
    postFunction(formData);
    el.reset();
  }

  formatDate(timestamp) {
    return moment(new Date(timestamp)).format("MMM DD YYYY");
  }

  postData(options) {
    return axios(options)
      .then(res => {
        if (res.headers["x-auth-token"]) {
          localStorage.setItem("auth", res.headers["x-auth-token"]);
        }
        return {
          status: res.status,
          data: res.data
        };
      })
      .catch(e => ({ status: e.response.status, data: e.response.data }));
  }

  getData(options) {
    return axios(options)
      .then(res => res)
      .catch(e => e);
  }
}

const util = new Utils();
export default util;
