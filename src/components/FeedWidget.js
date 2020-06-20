import React from 'react';

import Button from './Button';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoIcon from '@material-ui/icons/Photo';
import VideocamIcon from '@material-ui/icons/Videocam';
import DescriptionIcon from '@material-ui/icons/Description';

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
		color : 'white'
	}
});

const FeedWidget = () => (
	<Card className = {useStyles().root}>
		<CardContent classes = {{root : useStyles().rootContent}}>	
			<Button text="Write a Post" type = "post__button" />
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

export default FeedWidget;