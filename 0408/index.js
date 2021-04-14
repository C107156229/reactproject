import React from "react";
import ReactDOM from "react-dom";
import Cat1 from "./test/Cat1";
import Cat from "./test/Cat";
const comment = {
  date: new Date(),
  text: "I hope you enjoy learning React!",
  author: {
    name: "Hello Kitty",
    avatarUrl: "https://placekitten.com/g/64/64",
  },
};
ReactDOM.render(
  <Cat date={comment.date} text={comment.text} author={comment.author} />,
  document.getElementById("root")
);
