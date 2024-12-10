import prisma from '../db'

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  })

  res.json({ data: user.products })
}

export const getProduct = async (req, res) => {
  const productId = req.params.id

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      belongsToId: req.user.id,
    },
  })

  res.json({ data: product })
}

// Create one
export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  })

  res.json({ data: product })
}

// Update one
// where to find the product that belong to the user
// data to update the product
export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  })

  res.json({ data: updated })
}

// Delete one
export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  })

  res.json({ data: deleted })
}
