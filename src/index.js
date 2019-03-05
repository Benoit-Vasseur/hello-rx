import { fromEvent, from } from "rxjs";
import { map, flatMap } from "rxjs/operators";

const refreshButton = document.querySelector(".refresh");

const refreshClickStream = fromEvent(refreshButton, "click");

const requestStream = refreshClickStream.pipe(
  map(() => {
    const randomOffset = Math.floor(Math.random() * 500);
    return "https://api.github.com/users?since=" + randomOffset;
  })
);

const responseStream = requestStream.pipe(
  flatMap(x => from(fetch(x).then(x => x.json())))
  // flatMap(x => from(x.json()))
);

responseStream.subscribe(console.log);
