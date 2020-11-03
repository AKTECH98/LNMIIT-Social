import React, { useCallback } from 'react';

import Button from './Button';
import PostModal from './PostModal';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoIcon from '@material-ui/icons/Photo';
import VideocamIcon from '@material-ui/icons/Videocam';
import DescriptionIcon from '@material-ui/icons/Description';
import Dropzone from 'react-dropzone'



const useStyles = makeStyles({
	root: {
		backgroundColor: '#20222b',
		height: 'fit-content',
		textDecoration: 'none',
		marginBottom: 20
	},
	rootIcon: {
		color: 'white'
	},
	rootContent: {
		display: 'flex',
		justifyContent: 'space-between',
		color: 'white'
	}
});

const FeedWidgetView = (props) => (
	<Card className={useStyles().root}>
		<CardContent classes={{ root: useStyles().rootContent }}>
			<Button text="Write a Post" type="post__button" onClick={props.newPost} />
			{
				(props.openModal) ?
					<PostModal
						openModal={props.openModal}
						discardPost={props.discardPost}
						addPost={props.addPost}
					/>
					:
					''
			}

			<Typography>
				<Dropzone
					onDrop={props.onDrop}
					accept="image/png, image/gif image/jpg"//whatever the file type needed

					multiple
				>
					{({
						getRootProps,
						getInputProps,
					}) => {

						return (
							<div {...getRootProps()}>
								<input {...getInputProps()} />

								<IconButton classes={{ root: useStyles().rootIcon }} onClick={props.imageUpload}>
									<PhotoIcon fontSize="large" />
								</IconButton>
								<IconButton classes={{ root: useStyles().rootIcon }}>
									<VideocamIcon fontSize="large" />
								</IconButton>
								<IconButton classes={{ root: useStyles().rootIcon }}>
									<DescriptionIcon fontSize="large" />
								</IconButton>
							</div>
						);
					}}
				</Dropzone>


			</Typography>

		</CardContent>
	</Card>
)

export default class FeedWidget extends React.Component {
	state = {
		openModal: false,
		openImageUploadModal: false,
		post: " ",
		file: "",
		imagePreviewUrl: "",
	}

	newPost = () => {
		this.setState(() => ({
			openModal: true,

		}));
	}

	discardPost = () => {
		this.setState(() => ({
			openModal: false
		}));
	}

	addPost = (post) => {
		this.setState(() => ({
			post,
			openModal: false
		}));

		// Post Is Not Updating FIX THIS PLEASE
		console.log(this.state.myPost);
		console.log(post);
	}
	imageChange = e => {
		e.preventDefaule();
		let reader = new FileReader();
		e.targer.files[0];
		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result,
			});
		}
		reader.readAsDataURL(file);
	}
	imageUpload = () => {
		this.setState(() => ({
			openImageUploadModal: true,

		}));
	}


	onDrop = (files) => {
		// files.forEach((file) => {
		// 	const reader = new FileReader()

		// 	reader.onabort = () => console.log('file reading was aborted')
		// 	reader.onerror = () => console.log('file reading has failed')
		// 	reader.onload = () => {
		// 		// Do whatever you want with the file contents
		// 		const binaryStr = reader.result
		// 		console.log(binaryStr)
		// 	}
		// 	reader.readAsArrayBuffer(file)
		// })
		console.log(files);

	}


	render() {
		let { imagePreviewUrl } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = (<img src={imagePreviewUrl} />);
		} else {
			$imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
		}
		return (
			<div>
				<FeedWidgetView
					openModal={this.state.openModal}
					newPost={this.newPost}
					discardPost={this.discardPost}
					addPost={this.addPost}
					imageUpload={this.imageUpload}
					onDrop={this.onDrop}
				/>

			</div>
		)
	}
} 