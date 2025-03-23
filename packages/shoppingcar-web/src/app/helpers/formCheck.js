const handleYupSchema = async (schema, payload) => schema.validate(payload, { abortEarly: false });

const handleYupErrors = (errors) => {
  return errors.inner.reduce((currentError, nextError) => {
    const name = nextError.path;
    const message = nextError.message;
    return { ...currentError, [name]: message };
  }, {});
};

export { handleYupSchema, handleYupErrors };
export default { handleYupSchema, handleYupErrors };
