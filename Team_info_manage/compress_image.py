import PIL.Image as Image
import os
'''
当上传图片 做图片处理 加快 请求速度'''
standard_width = 125
standard_height = 161

show_width = 700
show_height = 300

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def compress_image(old,type=''):
  #  print(__path)
    if type == 'k':    #富文本框
        __path = os.path.join(BASE_DIR,"upload\\kindeditor\\" + str(old)).replace('\\', '/')
    else:
        __path = os.path.join(BASE_DIR, "upload\\" + str(old)).replace('\\', '/')

    img = Image.open(__path)
    if type == 'k':   #富文本框
        __img = img.resize((int(img.width/2), int(img.height/2)), Image.ANTIALIAS)  # 缩放，防止失真

    else:
        if type=='s':   #主页轮播图
            __img  = img.resize((show_width,show_height),Image.ANTIALIAS)  #缩放，防止失真
        else:
            __img = img.resize((standard_width, standard_height), Image.ANTIALIAS)
    __img.save(__path)
    # print(len(img.tobytes()))
    return None
   # des = img.resize(standard_width,standard_height,img.ANTIALIAS)

def remove_file(file_path):    #删除照片
    __path = os.path.join(BASE_DIR, "upload\\" + str(file_path)).replace('\\', '/')
    if os.path.exists(__path):
        os.remove(__path)
    return None
# def compress_interface(img):
# if __name__ == "__main__":
#     print(os.path.dirname(os.path.dirname(os.path.abspath(__file__))) ) #项目根目录)
#
#     remove_file('img/123.jpg')
#     # BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#     # __path = os.path.join(BASE_DIR, "upload\\" ).replace('\\', '/')
#     print(__path)
#   #  BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#   #  print(BASE_DIR)
#   #   old = 'D:\\WorkPlace\\PythonPrograms\\web\\grandfather\\upload\\img\\bcd.jpg'
#   #   des = ''
#     compress_image(img)