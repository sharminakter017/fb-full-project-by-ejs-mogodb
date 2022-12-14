import bcrypt from 'bcryptjs';
//========================================password compare
export const passwordCompare = (password, compass) => {
  const passcompare = bcrypt.compareSync(password, compass);
  return passcompare;
};