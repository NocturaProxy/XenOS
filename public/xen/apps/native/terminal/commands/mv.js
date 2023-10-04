export const help = async (args, process) => {
  const { fs } = process;

  return `
        mv - move a file
    `;
};

function filename(path, fn) {
  return path.replace(fn.dirname(path), "").replace(/^\//, "");
}

export const run = async (args, process) => {
  const { fs, path } = process;
  let [file, target] = args;

  target = path.resolve(fs.cwd(), target, filename(file, path));

  const data = await fs.readFile(file);
  await fs.unlink(file);
  await fs.writeFile(target, data);

  return true;
};
