export function once(fn) {
  let hasDoneStuff = false;
  if(hasDoneStuff == false) {
    hasDoneStuff = true;
    return fn();
  } else {
    return;
  }
}