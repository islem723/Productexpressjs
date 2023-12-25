import Product from "../Models/Product.js";

export async function createProduct(req, res) {
  const { title, description, price, quantity } = req.body;

  const created = await Product.create({
    title,

    description,
    price,
    quantity,
  });

  if (!created)
    return res.status(400).json({ error: "Could not create product!" });

  res.status(201).send({ message: "Product created", product: created });
}

export async function getAllProducts(req, res) {
  res.send(await Product.find());
}

export async function getProductById(req, res) {
  const { prodId } = req.params;

  const found = await Product.find({ _id: prodId });

  if (!found) return res.status(404).json({ error: "Invalid product" });

  res.send(found);
}

//tri
export async function getAllProductsTRi(req, res) {
  try {
    const { sortBy, sortOrder, page, perPage } = req.query;

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const skip = (page - 1) * perPage;
    const limit = parseInt(perPage);

    const products = await Product.find({})
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.json({ success: true, message: "Liste des produits", data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
}

export async function UpdateProduct(req, res) {
  const { productid } = req.params;

  const { title, description, price, quantity } = req.body;

  const updateRes = await Product.updateOne(
    { _id: productid },
    {
      $set: {
        title,
        description,
        price,
        quantity,
      },
    },
    { upsert: false }
  );

  if (!updateRes.modifiedCount)
    return res.status(404).json({ error: "No updates were performed!" });

  res.send({
    message: "Product updated!",
    product: await Product.findOne({ _id: productid }),
  });
}

export async function deleteProduct(req, res) {
  const { productId } = req.params;

  const deleted = await Product.deleteOne({ _id: productId });

  if (!deleted.deletedCount)
    return res.status(404).json({ error: "Invalid product" });

  res.send({ message: "Product deleted successfully!" });
}

//filter
export async function getAllProductsFilter(req, res) {
  try {
    const { name, priceMin, priceMax, category } = req.query;

    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (priceMin) {
      filter.price = { $gte: parseFloat(priceMin) };
    }
    if (priceMax) {
      filter.price = { ...filter.price, $lte: parseFloat(priceMax) };
    }
    if (category) {
      filter.category = category;
    }
    const products = await Product.find(filter);

    res.json({ success: true, message: "Liste des produits", data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
}
//pagination
export async function getAllProductsPagination(req, res) {
  try {
    const {
      name,
      priceMin,
      priceMax,
      category,
      sortBy,
      sortOrder,
      page,
      perPage,
    } = req.query;

    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (priceMin) {
      filter.price = { $gte: parseFloat(priceMin) };
    }
    if (priceMax) {
      filter.price = { ...filter.price, $lte: parseFloat(priceMax) };
    }
    if (category) {
      filter.category = category;
    }

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const skip = (page - 1) * perPage;
    const limit = parseInt(perPage);

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.json({ success: true, message: "Liste des produits", data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
}
