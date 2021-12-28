TARGETDIR="$1"
OUTDIR="output"
FILES=`find "$TARGETDIR" -maxdepth 1 -type f -name '*.jpg'`
 
echo `pwd`

sudo mkdir -p $OUTDIR
sudo chmod 777 $OUTDIR
for file in $FILES; do
	TARGET=`basename "$file" .jpg`
	# widthImage
	dist="$OUTDIR"/normal-"$TARGET"
	cp "$file" "$dist".jpg
	sips --resampleWidth 126 "$dist".jpg
	jpegtran -copy none -optimize -progressive -outfile "$dist".jpg "$dist".jpg
	# cwebp "$dist".jpg -o "$dist".webp
	npx avif --input="$dist.jpg" --output="$OUTDIR/" --overwrite --speed=0 --quality=30
	rm "$dist".jpg
	dist="$OUTDIR"/normal-"$TARGET"@mobile
	cp "$file" "$dist".jpg
	sips --resampleWidth 110 "$dist".jpg
	jpegtran -copy none -optimize -progressive -outfile "$dist".jpg "$dist".jpg
	# cwebp "$dist".jpg -o "$dist".webp
	npx avif --input="$dist.jpg" --output="$OUTDIR/" --overwrite --speed=0 --quality=30
	rm "$dist".jpg
	# mini
	dist="$OUTDIR"/mini-"$TARGET"
	cp "$file" "$dist".jpg
	sips --resampleWidth 62 "$dist".jpg
	jpegtran -copy none -optimize -progressive -outfile "$dist".jpg "$dist".jpg
	# cwebp "$dist".jpg -o "$dist".webp
	npx avif --input="$dist.jpg" --output="$OUTDIR/" --overwrite --speed=0 --quality=30
	rm "$dist".jpg
	dist="$OUTDIR"/mini-"$TARGET"@mobile
	cp "$file" "$dist".jpg
	sips --resampleWidth 46 "$dist".jpg
	jpegtran -copy none -optimize -progressive -outfile "$dist".jpg "$dist".jpg
	# cwebp "$dist".jpg -o "$dist".webp
	npx avif --input="$dist.jpg" --output="$OUTDIR/" --overwrite --speed=0 --quality=30
	rm "$dist".jpg
	#rm "$file"
	# jpegtran -arithmetic -progressive -arithmetic -copy all "$file" > "$OUTFILE"
	# SetFile -d "$CTIME" "$OUTFILE"
	# SetFile -m "$MTIME" "$OUTFILE"
done