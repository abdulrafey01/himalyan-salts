const Product = require("../models/Product");
const b2 = require("../helpers/backblaze");

exports.create = async (req, res) => {
  try {
    const {
      name,
      main_description,
      short_description,
      advantageTitle,
      advantageDescription,
      secondHeadingTitle,
      secondHeadingDescription,
    } = req.body;

    // Check if there is no file
    if (req.files.length === 0) {
      return res.status(400).json({ error: "No files were uploaded" });
    }

    // Get the bucket information
    const bucketResponse = await b2.getBucket({
      bucketName: "tutorinc-backend",
    });

    // Get the upload URL
    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId: bucketResponse.data.buckets[0].bucketId,
    });
    // Feature Image
    const feature_img = req.files.filter(
      (file) => file.fieldname === "feature_img"
    );

    // Upload the file
    const uploadFileResponse = await b2.uploadFile({
      uploadUrl: uploadUrlResponse.data.uploadUrl,
      uploadAuthToken: uploadUrlResponse.data.authorizationToken,
      fileName: `${feature_img[0].originalname}`,
      data: feature_img[0].buffer,
      onUploadProgress: null,
    });

    const featureImageUrl = `https://tutorinc-backend.s3.us-east-005.backblazeb2.com/${uploadFileResponse.data.fileName}`;

    // Array of Images
    const imgArray = req.files.filter((file) => file.fieldname === "imgArray");
    const imageArrayUrls = [];

    if (imgArray.length > 0) {
      // Upload the files
      for (const image of imgArray) {
        const uploadFileResponse = await b2.uploadFile({
          uploadUrl: uploadUrlResponse.data.uploadUrl,
          uploadAuthToken: uploadUrlResponse.data.authorizationToken,
          fileName: `${image.originalname}`,
          data: image.buffer,
          onUploadProgress: null,
        });
        // Handle the response
        imageArrayUrls.push(
          `https://tutorinc-backend.s3.us-east-005.backblazeb2.com/${uploadFileResponse.data.fileName}`
        );
      }
    }

    // Advantage Image
    const advantage_img = req.files.filter(
      (file) => file.fieldname === "advantageImg"
    );

    // Upload the file
    const uploadFileResponse2 = await b2.uploadFile({
      uploadUrl: uploadUrlResponse.data.uploadUrl,
      uploadAuthToken: uploadUrlResponse.data.authorizationToken,
      fileName: `${advantage_img[0].originalname}`,
      data: advantage_img[0].buffer,
      onUploadProgress: null,
    });

    const advantageImageUrl = `https://tutorinc-backend.s3.us-east-005.backblazeb2.com/${uploadFileResponse2.data.fileName}`;

    // Second Heading Image
    const secondHeadingImage = req.files.filter(
      (file) => file.fieldname === "secondHeadingImg"
    );

    // Upload the file
    const uploadFileResponse3 = await b2.uploadFile({
      uploadUrl: uploadUrlResponse.data.uploadUrl,
      uploadAuthToken: uploadUrlResponse.data.authorizationToken,
      fileName: `${secondHeadingImage[0].originalname}`,
      data: secondHeadingImage[0].buffer,
      onUploadProgress: null,
    });

    const secondHeadingImageUrl = `https://tutorinc-backend.s3.us-east-005.backblazeb2.com/${uploadFileResponse3.data.fileName}`;

    // Header Image
    const header_img = req.files.filter(
      (file) => file.fieldname === "header_img"
    );

    // Upload the file
    const uploadFileResponse4 = await b2.uploadFile({
      uploadUrl: uploadUrlResponse.data.uploadUrl,
      uploadAuthToken: uploadUrlResponse.data.authorizationToken,
      fileName: `${header_img[0].originalname}`,
      data: header_img[0].buffer,
      onUploadProgress: null,
    });

    const headerImageUrl = `https://tutorinc-backend.s3.us-east-005.backblazeb2.com/${uploadFileResponse4.data.fileName}`;

    // Save the product
    const newProduct = new Product({
      name,
      feature_img: featureImageUrl,
      header_img: headerImageUrl,
      main_description,
      short_description,
      imgArray: imageArrayUrls,
      advantage: {
        title: advantageTitle,
        description: advantageDescription,
        img: advantageImageUrl,
      },
      secondHeading: {
        title: secondHeadingTitle,
        description: secondHeadingDescription,
        img: secondHeadingImageUrl,
      },
    });

    await newProduct.save();

    res.status(200).json({
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Unable to create product",
    });
  }
};

// Fetch all products
exports.fetchAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to Get All Products",
    });
  }
};

exports.fetchOne = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to Get Product",
    });
  }
};
// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    // Check if product exists
    if (!deletedProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to delete product",
    });
  }
};

// Update product
exports.edit = async (req, res) => {
  try {
    // Get the bucket information
    const bucketResponse = await b2.getBucket({
      bucketName: "tutorinc-backend",
    });

    // Get the upload URL
    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId: bucketResponse.data.buckets[0].bucketId,
    });

    // Get id from params
    const { id } = req.params;

    const {
      name,
      main_description,
      short_description,
      advantageTitle,
      advantageDescription,
      secondHeadingTitle,
      secondHeadingDescription,
      imgArray: imgArrayB,
      advantageImg: advantageImgB,
      secondHeadingImg: secondHeadingImgB,
      feature_img: feature_imgB,
    } = req.body;

    // Advantage Image File
    const advantage_imgF = req.files.filter(
      (file) => file.fieldname === "advantageImg"
    );

    // Feature Image File
    const feature_imgF = req.files.filter(
      (file) => file.fieldname === "feature_img"
    );

    // Second Heading Image File
    const secondHeadingImageF = req.files.filter(
      (file) => file.fieldname === "secondHeadingImg"
    );

    // Image Array Files
    const imgArrayF = req.files.filter((file) => file.fieldname === "imgArray");
    // Updated Product
    const updatedProduct = {};

    updatedProduct.name = name;
    updatedProduct.main_description = main_description;
    updatedProduct.short_description = short_description;
    updatedProduct.advantage = {
      title: advantageTitle,
      description: advantageDescription,
    };
    updatedProduct.secondHeading = {
      title: secondHeadingTitle,
      description: secondHeadingDescription,
    };

    if (feature_imgB) {
      updatedProduct.feature_img = feature_imgB;
    } else if (feature_imgF.length > 0) {
      const uploadFileResponse = await b2.uploadFile({
        uploadUrl: uploadUrlResponse.data.uploadUrl,
        uploadAuthToken: uploadUrlResponse.data.authorizationToken,
        fileName: `${feature_imgF[0].originalname}`,
        data: feature_imgF[0].buffer,
        onUploadProgress: null,
      });

      const featureImageUrl = `https://tutorinc-backend.s3.us-east-005.backblazeb2.com/${uploadFileResponse.data.fileName}`;
      updatedProduct.feature_img = featureImageUrl;
    }

    if (advantageImgB) {
      updatedProduct.advantage.img = advantageImgB;
    } else if (advantage_imgF.length > 0) {
      // Upload the file
      const uploadFileResponse2 = await b2.uploadFile({
        uploadUrl: uploadUrlResponse.data.uploadUrl,
        uploadAuthToken: uploadUrlResponse.data.authorizationToken,
        fileName: `${advantage_imgF[0].originalname}`,
        data: advantage_imgF[0].buffer,
        onUploadProgress: null,
      });

      const advantageImageUrl = `https://tutorinc-backend.s3.us-east-005.backblazeb2.com/${uploadFileResponse2.data.fileName}`;
      updatedProduct.advantage.img = advantageImageUrl;
    }

    if (secondHeadingImgB) {
      updatedProduct.secondHeading.img = secondHeadingImgB;
    } else if (secondHeadingImageF.length > 0) {
      // Upload the file
      const uploadFileResponse3 = await b2.uploadFile({
        uploadUrl: uploadUrlResponse.data.uploadUrl,
        uploadAuthToken: uploadUrlResponse.data.authorizationToken,
        fileName: `${secondHeadingImageF[0].originalname}`,
        data: secondHeadingImageF[0].buffer,
        onUploadProgress: null,
      });

      const secondHeadingImageUrl = `https://tutorinc-backend.s3.us-east-005.backblazeb2.com/${uploadFileResponse3.data.fileName}`;
      updatedProduct.secondHeading.img = secondHeadingImageUrl;
    }

    const imageArrayUrls = [];
    if (imgArrayB) {
      imageArrayUrls.push(imgArrayB);
    }

    if (imgArrayF.length > 0) {
      // Upload the files
      for (const image of imgArrayF) {
        const uploadFileResponse = await b2.uploadFile({
          uploadUrl: uploadUrlResponse.data.uploadUrl,
          uploadAuthToken: uploadUrlResponse.data.authorizationToken,
          fileName: `${image.originalname}`,
          data: image.buffer,
          onUploadProgress: null,
        });
        // Handle the response
        imageArrayUrls.push(
          `https://tutorinc-backend.s3.us-east-005.backblazeb2.com/${uploadFileResponse.data.fileName}`
        );
      }
    }

    updatedProduct.imgArray = imageArrayUrls;

    // Update the existing product
    await Product.findByIdAndUpdate(
      id,
      {
        $set: updatedProduct,
      },
      { new: true }
    );

    // Send response
    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Unable to update product",
    });
  }
};
