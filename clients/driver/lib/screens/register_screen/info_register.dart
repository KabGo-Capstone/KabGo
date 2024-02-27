import 'package:driver/constants/colors.dart';
import 'package:driver/widgets/build_text.dart';
import 'package:flutter/material.dart';

class InfoRegister extends StatefulWidget {
  final String selectedService;
  const InfoRegister({
    super.key,
    required this.selectedService,
  });

  @override
  State<InfoRegister> createState() => _InfoRegisterState();
}

class _InfoRegisterState extends State<InfoRegister> {
  bool isCompleted = false;
  bool isCompleted2 = true;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: COLOR_WHITE,
        actions: [
          OutlinedButton(
            onPressed: () {
              print('Cần hỗ trợ');
            },
            style: ButtonStyle(
              minimumSize: MaterialStateProperty.all(const Size(0, 0)),
              padding: MaterialStateProperty.all(
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 5)),
              side: MaterialStateProperty.all(const BorderSide(
                  color: Color.fromARGB(255, 97, 97, 97), width: 0.7)),
            ),
            child: const Text(
              'Cần hỗ trợ?',
              style: TextStyle(color: Colors.black),
            ),
          ),
          const SizedBox(
            width: 20,
          )
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: ListView(
              shrinkWrap: true,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Flexible(
                      flex: 2,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          buildText(
                            'Gửi tài liệu',
                            kBlackColor,
                            18,
                            FontWeight.w600,
                            TextAlign.start,
                            TextOverflow.clip,
                          ),
                          buildText(
                            'Bạn đang đăng ký gói ${widget.selectedService}. Hãy đảm bảo rằng tất cả tài liệu của bạn đã được cập nhật',
                            kBlackColor,
                            12,
                            FontWeight.w400,
                            TextAlign.start,
                            TextOverflow.clip,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(
                        width: 10), // Khoảng cách giữa chữ và hình ảnh
                    Expanded(
                      child: Container(
                        alignment: Alignment.center,
                        child: Image.asset(
                          'assets/images/register/docs.png',
                          // Đặt các thuộc tính của hình ảnh theo nhu cầu
                        ),
                      ),
                    ),
                  ],
                ),
                Column(
                  children: [
                    const SizedBox(
                      height: 10,
                    ),
                    const Row(
                      children: [
                        Text(
                          'Thông tin cá nhân',
                          style: TextStyle(
                              fontWeight: FontWeight.w600, fontSize: 16),
                        )
                      ],
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    //Ảnh chân dung
                    Container(
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      decoration: const BoxDecoration(
                        border: Border(
                            bottom: BorderSide(
                                color: COLOR_GRAY,
                                width: 0.5)), // Border bottom
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Ảnh chân dung',
                            style: TextStyle(fontWeight: FontWeight.w500),
                          ),
                          Row(
                            children: [
                              Text(
                                isCompleted ? 'Đã hoàn tất' : 'Bắt buộc',
                                style: TextStyle(
                                  color: isCompleted ? Colors.green : kOrange,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              Icon(
                                Icons.arrow_right_alt,
                                color: isCompleted ? Colors.green : kOrange,
                              )
                            ],
                          )
                        ],
                      ),
                    ),
                    //CCCD/CMND/Hộ chiếu
                    Container(
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      decoration: const BoxDecoration(
                        border: Border(
                            bottom: BorderSide(
                                color: COLOR_GRAY,
                                width: 0.5)), // Border bottom
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'CCCD/CMND/Hộ chiếu',
                            style: TextStyle(fontWeight: FontWeight.w500),
                          ),
                          Row(
                            children: [
                              Text(
                                isCompleted2 ? 'Đã hoàn tất' : 'Bắt buộc',
                                style: TextStyle(
                                  color: isCompleted2 ? Colors.green : kOrange,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              Icon(
                                Icons.arrow_right_alt,
                                color: isCompleted2 ? Colors.green : kOrange,
                              )
                            ],
                          )
                        ],
                      ),
                    )
                  ],
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
