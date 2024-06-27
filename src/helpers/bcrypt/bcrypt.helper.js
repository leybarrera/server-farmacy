import bcrypt from "bcrypt";
const { hash, compare } = bcrypt;

const hashPassword = async (password) => hash(password, 12);
const comparePassword = async (password, hash) => compare(password, hash);

export default { hashPassword, comparePassword };
