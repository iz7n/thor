import { expandGlob } from 'fs/mod.ts';

import Value, { Future, List, None, String, Bytes } from '../../values/mod.ts';

export function readFile(path: Value): Future<Bytes> {
  if (!(path instanceof String)) throw 'readFile() expects a string';
  return new Future(Deno.readFile(path.value).then(arr => new Bytes(arr)));
}

export function readTextFile(path: Value): Future<String> {
  if (!(path instanceof String)) throw 'readTextFile() expects a string';
  return new Future(Deno.readTextFile(path.value).then(str => new String(str)));
}

export function writeFile(path: Value, data: Value): Future<None> {
  if (!(path instanceof String) || !(data instanceof Bytes))
    throw 'writeFile() expects a string and uint8[]';
  return new Future(
    Deno.writeFile(path.value, data.value).then(() => new None())
  );
}

export function writeTextFile(path: Value, data: Value): Future<None> {
  if (!(path instanceof String) || !(data instanceof String))
    throw 'writeTextFile() expects 2 strings';
  return new Future(
    Deno.writeTextFile(path.value, data.value).then(() => new None())
  );
}

export function copyFile(fromPath: Value, toPath: Value): Future<None> {
  if (!(fromPath instanceof String) || !(toPath instanceof String))
    throw 'copyFile() expects 2 strings';
  return new Future(
    Deno.copyFile(fromPath.value, toPath.value).then(() => new None())
  );
}

export default {
  delete: (path: Value): Future<None> => {
    if (!(path instanceof String)) throw 'delete() expects a string';
    return new Future(Deno.remove(path.value).then(() => new None()));
  }
};

export function mkdir(path: Value): Future<None> {
  if (!(path instanceof String)) throw 'mkdir() expects a string';
  return new Future(Deno.mkdir(path.value).then(() => new None()));
}

export function readDir(path: Value): Future<List> {
  if (!(path instanceof String)) throw 'readDir() expects a string';
  return new Future(
    (async () => {
      const files: string[] = [];
      for await (const file of expandGlob(path.value)) {
        files.push(file.path);
      }
      return new List(files.map(file => new String(file)));
    })()
  );
}
