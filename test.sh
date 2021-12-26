height=900
width=600
height2=400
width2=300
left=$(($height*$width2))
right=$(($height2*$width))
if test $left -gt $right ; then
    echo a
fi
echo $da