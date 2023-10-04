export const help = async (args, process) => {
  const { fs } = process;

  return `
        ls - delete files
    `;
};

export const run = async (args, process) => {
  const { fs } = process;
  const [file] = args;

  if (!file) throw "Missing Required Argument";

  if (file === "kids") {
    process.write("\r\n");
    process.write("ayo???");
  }

  await fs.writeFile(file, "");

  return true;
};
