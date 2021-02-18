from django.test import TestCase
import json

from student_manage.models import student_info

class StuTestCase(TestCase):
    def setUp(self):
        pass

    def test_stu_add(self):
        req_data = {
            "stu_name": "李华",
            "stu_id": "1111111111",
            "stu_sex": "m",
            "stu_iden": "0",
            "stu_pic": "",
            "stu_intro": "hello",
            "status": "1"
        }
        resp = self.client.post('/student_manage/stu_add/', data=req_data)
        print(resp)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(
            json.loads(resp.content),
            req_data
        )
