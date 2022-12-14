class Validate{
    static isEmail(email) {
        return (/^[a-z0-9\.]{1,}@[a-z0-9]{1,}\.[a-z0-9]{1,5}$/);
      }
    
      static isNumber(number) {
        return (/^[0-9]{1,4}$/);
      }
};

export default Validate;