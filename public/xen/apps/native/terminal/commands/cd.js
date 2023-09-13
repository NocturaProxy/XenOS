export const help = async (args, process) => {
    const { fs } = process;

    return `
        cd - change directory
    `;
}

export const run = async (args, process) => {
    const { fs } = process;
    const [ str = "/xen/users/guest" ] = args;

    await process.changeDir(str);

    return true;
}