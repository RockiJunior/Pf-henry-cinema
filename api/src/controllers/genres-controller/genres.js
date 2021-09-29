const { genres } = require("../../db");
const genrePost = async (req, res) => {
  try {
    const { name } = req.body;
    const [genreQuery, created] = await genres.findOrCreate({
      where: {
        name,
      },
    });
    if (created) res.json(genreQuery);
    else res.status(404).send("La receta ya existia en la base de datos");
  } catch (error) {
    console.log(error);
  }
};
const genrePut = async (req, res) => {
  try {
    const { id } = req.params;
    const name = req.body;
    const updateGenre = await genres.update(name, {
      where: {
        id,
      },
    });
    if (updateGenre[0] !== 0)
      res.json("El genero fue actualizado correctamente");
    else
      res
        .status(404)
        .send(
          "Ha ocurrido un error, la actualizacion solicitada no pudo completarse"
        );
  } catch (error) {
    console.log(error);
  }
};

const genreDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const genreById = await genres.findByPk(id);
    console.log(genreById);
    if (genreById) {
      genreById.destroy();
      res.json("Genero eliminado con exito");
    } else res.status(404).send("No existe ese genero");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  genrePost,
  genreDelete,
  genrePut,
};
