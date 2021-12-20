export default {
  secret: process.env.SECRET_JWT || 'secret_hash_example',

  expiresIn: '1d',
};
