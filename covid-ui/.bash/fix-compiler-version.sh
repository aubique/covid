echo "Update typescript compiler..."
if [[ "$PWD" =~ covid$ ]]; then
	echo "Moving from root directory";
	cd covid-ui/;
elif [[ "$PWD" =~ bash$ ]]; then
	echo "Moving from misc sub-directory";
	cd ../;
else
	echo "Unknown source directory, aborting...";
	exit 1;
fi

sudo npm install typescript@">=3.6.4 <3.9.0" --save-dev --save-exact
