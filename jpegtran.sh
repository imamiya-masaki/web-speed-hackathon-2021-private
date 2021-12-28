TARGETDIR="$1"
OUTDIR="output"
FILES=`find "$TARGETDIR" -maxdepth 1 -type f -name '*.jpg'`
 
echo `pwd`
 
sudo mkdir -p $OUTDIR
sudo chmod 777 $OUTDIR
sudo mkdir $OUTDIR/widthImage
sudo chmod 777 $OUTDIR/widthImage
sudo mkdir $OUTDIR/heightImage
sudo chmod 777 $OUTDIR/heightImage
sudo mkdir $OUTDIR/widthMiniImage
sudo chmod 777 $OUTDIR/widthMiniImage
for file in $FILES; do
	TARGET=`basename "$file" .jpg`
	# widthImage
	dist="$OUTDIR"/widthImage-"$TARGET"
	cp "$file" "$dist".jpg
	height=`identify -format "%h" "$dist".jpg`
	width=`identify -format "%w" "$dist".jpg`
	left=$(($height*574))
	right=$(($width*322))
	if test $left -gt $right ; then
		#縦長の画像
		sips --resampleWidth 574 "$dist".jpg
	else
		sips --resampleHeight 322 "$dist".jpg
	fi
	# if test $height -lt 322 ; then
	# 	sips -z 322 574 "$dist".jpg
	# fi
	sips -c 322 574 "$dist".jpg
	jpegtran -copy none -optimize -progressive -outfile "$dist".jpg "$dist".jpg
	# cwebp "$dist".jpg -o "$dist".webp
	npx avif --input="$dist.jpg" --output="$OUTDIR/" --overwrite --speed=0 --quality=30
	rm "$dist".jpg
	dist="$OUTDIR"/widthImage-"$TARGET"@mobile
	cp "$file" "$dist".jpg
	height=`identify -format "%h" "$dist".jpg`
	width=`identify -format "%w" "$dist".jpg`
	left=$(($height*303))
	right=$(($width*170))
	if test $left -gt $right ; then
		#縦長の画像
		sips --resampleWidth 303 "$dist".jpg
	else
		sips --resampleHeight 170 "$dist".jpg
	fi
	# if test $height -lt 170 ; then
	# 	sips -z 170 303 "$dist".jpg
	# fi
	sips -c 170 303 "$dist".jpg
	jpegtran -copy none -optimize -progressive -outfile "$dist".jpg "$dist".jpg
	# cwebp "$dist".jpg -o "$dist".webp
	npx avif --input="$dist.jpg" --output="$OUTDIR/" --overwrite --speed=0 --quality=30
	rm "$dist".jpg
	# heightImage
	# heightだとleft > rightだとうまくいかないことがある...
	dist="$OUTDIR"/heightImage-"$TARGET"
	cp "$file" "$dist".jpg
	height=`identify -format "%h" "$dist".jpg`
	width=`identify -format "%w" "$dist".jpg`
	left=$(($height*285))
	right=$(($width*322))
	if test $left -gt $right ; then
		#縦長の画像
		sips --resampleWidth 285 "$dist".jpg
	else
		sips --resampleHeight 322 "$dist".jpg
	fi
	# if test $height -lt 322 ; then
	# 	sips -z 322 285 "$dist".jpg
	# fi
	sips -c 322 285 "$dist".jpg
	jpegtran -copy none -optimize -progressive -outfile "$dist".jpg "$dist".jpg
	# cwebp "$dist".jpg -o "$dist".webp
	npx avif --input="$dist.jpg" --output="$OUTDIR/" --overwrite --speed=0 --quality=30
	rm "$dist".jpg
	dist="$OUTDIR"/heightImage-"$TARGET"@mobile
	cp "$file" "$dist".jpg
	height=`identify -format "%h" "$dist".jpg`
	width=`identify -format "%w" "$dist".jpg`
	left=$(($height*157))
	right=$(($width*378))
	if test $height -gt $width ; then
		#縦長の画像
		sips --resampleWidth 157 "$dist".jpg
	else
		sips --resampleHeight 178 "$dist".jpg
	fi
	# if test $height -lt 178 ; then
	# 	sips -z 178 157 "$dist".jpg
	# fi
	sips -c 178 157 "$dist".jpg
	jpegtran -copy none -optimize -progressive -outfile "$dist".jpg "$dist".jpg
	# cwebp "$dist".jpg -o "$dist".webp
	npx avif --input="$dist.jpg" --output="$OUTDIR/" --overwrite --speed=0 --quality=30
	rm "$dist".jpg
	# widthMiniImage
	dist="$OUTDIR"/widthMiniImage-"$TARGET"
	cp "$file" "$dist".jpg
	height=`identify -format "%h" "$dist".jpg`
	width=`identify -format "%w" "$dist".jpg`
	left=$(($height*285))
	right=$(($width*159))
	if test $left -gt $right ; then
		#縦長の画像
		sips --resampleWidth 285 "$dist".jpg
	else
		sips --resampleHeight 159 "$dist".jpg
	fi
	# if test $height -lt 159 ; then
	# 	sips -z 159 285 "$dist".jpg
	# fi
	sips -c 159 285 "$dist".jpg
	jpegtran -copy none -optimize -progressive -outfile "$dist".jpg "$dist".jpg
	# cwebp "$dist".jpg -o "$dist".webp
	npx avif --input="$dist.jpg" --output="$OUTDIR/" --overwrite --speed=0 --quality=30
	rm "$dist".jpg
	dist="$OUTDIR"/widthMiniImage-"$TARGET"@mobile
	cp "$file" "$dist".jpg
	height=`identify -format "%h" "$dist".jpg`
	width=`identify -format "%w" "$dist".jpg`
	left=$(($height*157))
	right=$(($width*87))
	if test $left -gt $right ; then
		#縦長の画像
		sips --resampleWidth 157 "$dist".jpg
	else
		sips --resampleHeight 87 "$dist".jpg
	fi
	# if test $height -lt 87 ; then
	# 	sips -z 87 157 "$dist".jpg
	# fi
	sips -c 87 157 "$dist".jpg
	jpegtran -copy none -optimize -progressive -outfile "$dist".jpg "$dist".jpg
	# cwebp "$dist".jpg -o "$dist".webp
	npx avif --input="$dist.jpg" --output="$OUTDIR/" --overwrite --speed=0 --quality=30
	rm "$dist".jpg
	#rm "$file"
	# jpegtran -arithmetic -progressive -arithmetic -copy all "$file" > "$OUTFILE"
	# SetFile -d "$CTIME" "$OUTFILE"
	# SetFile -m "$MTIME" "$OUTFILE"
done