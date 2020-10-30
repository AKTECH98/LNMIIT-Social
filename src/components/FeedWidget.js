import React from 'react';

import Button from './Button';
import PostModal from './PostModal';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoIcon from '@material-ui/icons/Photo';
import VideocamIcon from '@material-ui/icons/Videocam';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles({
  	root: {
		backgroundColor: 'white',
		height: 'fit-content',
		textDecoration: 'none',
		marginBottom: 10,
		border: 0.5,
		borderStyle: 'solid',
		borderColor: 'grey' 
	},
  	rootIcon: {
    	color: '#4574bf'
	},
	rootContent: {
		display: 'flex',
		height: 'fit-content',
		justifyContent: 'space-between',
	}
});

const FeedWidgetView = (props) => (
	<Card className = {useStyles().root}>
		<CardContent classes = {{root : useStyles().rootContent}}>
			<Button text="Write a Post" type = "post__button"  onClick = {props.newPost} />
			{
				(props.openModal)?
				<PostModal
					openModal = {props.openModal}
					discardPost = {props.discardPost}
					addPost = {props.addPost}
				/>
				:
				''
		  	}
			<Typography>
				<IconButton classes = {{root : useStyles().rootIcon}}>
					<PhotoIcon fontSize = "large"/>
				</IconButton>
				<IconButton classes = {{root : useStyles().rootIcon}}>
					<VideocamIcon fontSize = "large"/>
				</IconButton>
				<IconButton classes = {{root : useStyles().rootIcon}}>
					<DescriptionIcon fontSize = "large"/>
				</IconButton>
			</Typography>
		</CardContent>
  </Card>
)

export default class FeedWidget extends React.Component{
	state = {
		openModal: false,
		post: " "
	}

	newPost = () => {
		this.setState(() =>({
			openModal: true
		}));
	}

	discardPost = () =>{
		this.setState(() => ({
			openModal: false
		}));
	}

	addPost = (post) => {
		this.setState(()=>({
			post,
			openModal: false
		}));
	}

	render(){
		return(
			<div>
				<FeedWidgetView 
					openModal = {this.state.openModal}
					newPost = {this.newPost}
					discardPost = {this.discardPost}
					addPost = {this.addPost}
				/>
			</div>
		)
	}
} 