import Vue from 'vue'
import { Notification } from 'element-ui';

//overdefined Element $notify
const CS = function (args) {
  var style = {}
  switch (args.type) {
    case "success":
      style = { style: "color: teal" }
      break;
    case "error":
      style = { style: "color: red" }
      break;
  }

  Notification({
    title: args.title,
    message: args.h(
      "i",
      style,
      args.message
    ),
    type: args.type
  })
}

export default CS