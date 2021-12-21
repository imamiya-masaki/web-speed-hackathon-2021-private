TARGETDIR="$1"
OUTDIR="$1"
FILES=`find "$TARGETDIR" -maxdepth 1 -type f -name '*.jpg'`
 
echo `pwd`
 
mkdir -p $OUTDIR
for file in $FILES; do
	echo $file
	TARGET=`basename "$file" .jpg`
	jpegtran -copy none -optimize -progressive -outfile "$file" "$file"
	sips --resampleWidth 318 "$file"
	sips -c 178 318 "$file"
	cwebp "$file" -o "$TARGET"@178x318.webp
	rm "$file"
	# jpegtran -arithmetic -progressive -arithmetic -copy all "$file" > "$OUTFILE"
	# SetFile -d "$CTIME" "$OUTFILE"
	# SetFile -m "$MTIME" "$OUTFILE"
done