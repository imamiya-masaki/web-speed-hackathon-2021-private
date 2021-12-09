TARGETDIR="$1"
OUTDIR="$1"
FILES=`find "$TARGETDIR" -maxdepth 1 -type f -name '*.gif'`
 
echo `pwd`
 
mkdir -p $OUTDIR
for file in $FILES; do
	echo $file
	 cp "$file" "$file-origin"
	 rm "$file"
	 gifsicle --optimize=3 "$file-origin" > "$file"
	 rm "$file-origin"
	# jpegtran -arithmetic -progressive -arithmetic -copy all "$file" > "$OUTFILE"
	# SetFile -d "$CTIME" "$OUTFILE"
	# SetFile -m "$MTIME" "$OUTFILE"
done