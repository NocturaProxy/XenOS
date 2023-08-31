export const help = async (args, process) => {
    const { fs } = process;

    return `
        echo - log something to the console
    `;
}

export const run = async (args, process) => {
    const { fs } = process;
    const [ str ] = args;

    process.write("\r\n");
    process.write(eval(`"${str || ""}"`));

    return true;
}