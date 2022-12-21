import postModel from "../model/postModel.js"
import userModel from "../model/userModel.js"

import * as fs from 'fs/promises'
import { existsSync } from 'node:fs';
import compress_images from 'compress-images';
import { randomUUID } from "crypto"


export const createPost = async (req, res, next) => {
    try {
        const post = {...req.body, tags: req.body?.tags.split(',') }
        const file = req.files.selectedFile
        const user = await userModel.findById(req.userId)
         
        const tempDir = `./public/images/temp`

        if (!existsSync(tempDir)) {
            await fs.mkdir(tempDir)
        }
 
        const filename = `file_${new Date().getTime()}_${randomUUID()}` 
        const ext = (file.name).split('.')[1]; // extension of file
           
        const uploadPath = `./public/images/temp/${filename}.${ext}`; 
  
        await file.mv(uploadPath);
                
        const outputPath = `./public/images/${user._id}/`;

        if(!existsSync(outputPath)){
            await fs.mkdir(outputPath)
        }

        await ImageCompress(req, res, next, uploadPath, outputPath)
        const selectedFile = `/images/${user._id}/${filename}.${ext}`
        const newPost = new postModel({ ...post, selectedFile: selectedFile, creator: user.name, owner: user._id, createdAt: new Date().toISOString() })
        await newPost.save()
        await sleep(3000)
        return res.status(201).json(newPost)
    }
    catch (err) {
        return res.status(409).json({'message': err.message})
    }
}

export const updatePost = async (req, res, next) =>{
    try {
        const post_id = req.params['id']
        const old_file = req.body ? req.body['old_file'] ? req.body['old_file'] : null : null
        const file = req.files?.selectedFile ? req.files.selectedFile : null
        const userId = req.userId

        if (file){

            const filename = `file_${new Date().getTime()}_${randomUUID()}` 
            const ext = (file.name).split('.')[1]; // extension of file
            
            const uploadPath = `./public/images/temp/${filename}.${ext}`; 
    
            await file.mv(uploadPath);
                    
            const outputPath = `./public/images/${userId}/`;

            if(!existsSync(outputPath)){
                await fs.mkdir(outputPath)
            }

            await ImageCompress(req, res, next, uploadPath, outputPath)
            

            const selectedFile = `/images/${userId}/${filename}.${ext}`

            const data = {
                ...req.body,
                tags : req.body['tags'].split(','),
                selectedFile: selectedFile
            }
            const newData = await postModel.findByIdAndUpdate({'_id': post_id}, data, {new : true})
            
            // after new file add / then delete
            await fs.unlink(`./public${old_file}`)

            await sleep(3000)
            return res.status(203).json(newData) 
        }
        else{
            const data = {
                ...req.body,
                tags : req.body['tags'].split(',')
            }
            const newData = await postModel.findByIdAndUpdate({'_id': post_id}, data, {new : true})
            return res.status(203).json(newData) 
        }
    } catch (err) {
        console.log(err);
        res.status(409).json({'message': err.message})
    }
}

export const deletePost = async (req, res) =>{
    try {
        const id = req.params['id']
        const newData = await postModel.findByIdAndRemove({'_id': id})
        await fs.unlink(`./public${newData['selectedFile']}`)
        return res.status(203).json(newData)
    } catch (err) {
        return res.status(409).json({'message': err.message})
    }
}

export const getPageWithSearch = async (req, res) =>{ 
    try { 
        
        // pagination
        const Limit = 6
        const { page } = req.params ? (req.params) : 1
        const start = ((page - 1) * Limit) 

        // search Query
        const title = req.params?.title ? req.params.title : 'null'
        const tags = req.params?.tags ? req.params.tags : 'null'
 
        if (title != 'null' || tags != 'null') {
            
            const query = new RegExp(title, 'i')
            const count = await postModel.find( { $or : [ { title : query }, { tags : { $in: tags.split(',') } } ] } ).countDocuments()
            const totalPage = Math.ceil(count/Limit) 
            const posts = await postModel.find( { $or : [ { title : query }, { tags : { $in: tags.split(',') } } ] } ).skip(start).limit(Limit)
                if (posts == '')
                    return res.status(200).json({message : 'No Record Found'})
            return  res.status(200).json({totalPage : totalPage, currentPage: parseInt(page), data : posts}) 
        }
        else{
            
            const count = await postModel.countDocuments() 
            const totalPage = Math.ceil(count/Limit) 
            const posts = await postModel.find().sort({_id : -1}).skip(start).limit(Limit)
            if (posts == '')
                return res.status(200).json({message : 'No Record Found'})
            return res.status(200).json({totalPage : totalPage, currentPage: parseInt(page), data : posts}) 
        } 
    } catch (err) {
        console.log(err);
        return res.status(503).json({message : err})
    }
}

export const getSinglePost = async(req, res) => {
    try {
        const { id } = req.params
        const post = await postModel.findById(id)
        if (post) {
            return res.status(200).json(post)
        }
        return res.status(400).json({message : 'Data Not Found'})
    } catch (err) {
        console.log(err)
        return res.status(403).json({message: err.message})
    }
}

const ImageCompress = async (req, res, next, uploadPath, outputPath) => {
    const compression = 60
    compress_images(uploadPath, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", compression] } },
        { png: { engine: "pngquant", command: ["--quality=" + compression + "-" + compression, "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        async function (error, completed, statistic) {
            const a = await fs.unlink(uploadPath)
            console.log(a);
            console.log(uploadPath);
        }
    ) 
    
}

const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

  